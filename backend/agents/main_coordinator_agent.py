# main_coordinator_agent.py

from uagents import Agent, Context
from uagents.setup import fund_agent_if_low
from Backend.models import UserInput, Schedule, ContentRequest, GeneratedContent, TopicSuggestion, TopicRequest, Feedback, StateRequest, StateResponse
from Backend.config import Config
import asyncio

main_agent = Agent(
    name="main_coordinator",
    seed=Config.MAIN_COORDINATOR_SEED,
    port=Config.MAIN_COORDINATOR_PORT,
    endpoint=[f"http://127.0.0.1:{Config.MAIN_COORDINATOR_PORT}/submit"]
)

fund_agent_if_low(main_agent.wallet.address())

@main_agent.on_event("startup")
async def initialize(ctx: Context):
    ctx.storage.set("user_input", None)
    ctx.storage.set("schedule", None)
    ctx.storage.set("generated_content", [])
    ctx.storage.set("suggested_topics", [])
    ctx.logger.info(f"Main Coordinator Agent started. Address: {main_agent.address}")

@main_agent.on_message(model=UserInput)
async def handle_user_input(ctx: Context, sender: str, msg: UserInput):
    ctx.logger.info(f"Received user input: {msg.dict()}")
    ctx.storage.set("user_input", msg.dict())
    
    # Trigger scheduling agent
    ctx.logger.info(f"Triggering scheduling agent at address: {Config.SCHEDULING_AGENT_ADDRESS}")
    try:
        schedule_response = await ctx.send(Config.SCHEDULING_AGENT_ADDRESS, msg)
        ctx.logger.info(f"Received schedule from scheduling agent: {schedule_response}")
        if isinstance(schedule_response, Schedule):
            ctx.storage.set("schedule", schedule_response.dict())
        elif isinstance(schedule_response, dict) and "error" in schedule_response:
            ctx.logger.error(f"Error from scheduling agent: {schedule_response['error']}")
        else:
            ctx.logger.error(f"Unexpected schedule response type: {type(schedule_response)}")
    except Exception as e:
        ctx.logger.error(f"Error sending message to scheduling agent: {str(e)}")

    # Trigger content generation for initial post
    if ctx.storage.get("schedule"):
        initial_content_request = ContentRequest(
            topic=f"{msg.area_of_interest} - Initial Post",
            day=ctx.storage.get("schedule")["posting_days"][0],
            area_of_interest=msg.area_of_interest,
            content_type=msg.content_type,
            keywords=msg.keywords
        )
        ctx.logger.info(f"Triggering content generation agent at address: {Config.CONTENT_GENERATION_AGENT_ADDRESS}")
        try:
            content_response = await ctx.send(Config.CONTENT_GENERATION_AGENT_ADDRESS, initial_content_request)
            ctx.logger.info(f"Received initial content from content generation agent: {content_response}")
            if isinstance(content_response, GeneratedContent):
                generated_content = ctx.storage.get("generated_content", [])
                generated_content.append(content_response.dict())
                ctx.storage.set("generated_content", generated_content)
            elif isinstance(content_response, dict) and "error" in content_response:
                ctx.logger.error(f"Error from content generation agent: {content_response['error']}")
            else:
                ctx.logger.error(f"Unexpected content response type: {type(content_response)}")
        except Exception as e:
            ctx.logger.error(f"Error sending message to content generation agent: {str(e)}")
    else:
        ctx.logger.error("Cannot generate content: No schedule available")

    ctx.logger.info(f"Final state after handling user input: {ctx.storage.get_all()}")

    # Send response back to the frontend
    state = StateResponse(
        user_input=ctx.storage.get("user_input"),
        schedule=ctx.storage.get("schedule"),
        generated_content=ctx.storage.get("generated_content"),
        suggested_topics=ctx.storage.get("suggested_topics")
    )
    await ctx.send(sender, state)

@main_agent.on_message(model=Feedback)
async def handle_feedback(ctx: Context, sender: str, msg: Feedback):
    ctx.logger.info(f"Received feedback: {msg}")
    if msg.liked:
        # Trigger topic suggestion for remaining posts
        schedule = ctx.storage.get("schedule")
        user_input = ctx.storage.get("user_input")
        if schedule and user_input:
            topic_request = TopicRequest(
                area_of_interest=user_input["area_of_interest"],
                content_type=user_input["content_type"],
                keywords=user_input["keywords"],
                num_topics=len(schedule["posting_days"]) - 1  # Subtract 1 for the initial post
            )
            ctx.logger.info(f"Triggering topic suggestion agent: {topic_request}")
            topics_response = await ctx.send(Config.TOPIC_SUGGESTION_AGENT_ADDRESS, topic_request)
            ctx.logger.info(f"Received topics from topic suggestion agent: {topics_response}")
            ctx.storage.set("suggested_topics", topics_response.topics)

            # Generate content for remaining posts
            for day, topic in zip(schedule["posting_days"][1:], topics_response.topics):
                content_request = ContentRequest(
                    topic=topic,
                    day=day,
                    area_of_interest=user_input["area_of_interest"],
                    content_type=user_input["content_type"],
                    keywords=user_input["keywords"]
                )
                ctx.logger.info(f"Triggering content generation for: {content_request}")
                content_response = await ctx.send(Config.CONTENT_GENERATION_AGENT_ADDRESS, content_request)
                ctx.logger.info(f"Received content from content generation agent: {content_response}")
                generated_content = ctx.storage.get("generated_content", [])
                generated_content.append(content_response.dict())
                ctx.storage.set("generated_content", generated_content)

    # Send updated state back to the frontend
    await ctx.send(sender, StateResponse(
        user_input=ctx.storage.get("user_input"),
        schedule=ctx.storage.get("schedule"),
        generated_content=ctx.storage.get("generated_content"),
        suggested_topics=ctx.storage.get("suggested_topics")
    ))

@main_agent.on_message(model=StateRequest)
async def get_current_state(ctx: Context, sender: str, msg: StateRequest):
    ctx.logger.info(f"Received state request from {sender}")
    state = StateResponse(
        user_input=ctx.storage.get("user_input"),
        schedule=ctx.storage.get("schedule"),
        generated_content=ctx.storage.get("generated_content"),
        suggested_topics=ctx.storage.get("suggested_topics")
    )
    ctx.logger.info(f"Sending state response: {state.dict()}")
    await ctx.send(sender, state)

if __name__ == "__main__":
    main_agent.run()