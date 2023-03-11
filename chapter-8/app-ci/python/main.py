from fastapi import FastAPI
import os
from dapr.clients import DaprClient

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: str = None):
    return {"item_id": item_id, "q": q}

@app.get("/state/{key}")
async def read_state(key: str):
    with DaprClient() as d:
        value = d.get_state("statestore", key)
    return {"key": key, "value": value}

@app.put("/state/{key}/{value}")
async def write_state(key: str = "a", value: str = 'a'):
    with DaprClient() as d:
        d.save_state("statestore", key, value)
    return {"key": key, "value": value}

@app.post("/user")
async def create_user(user: dict):
    with DaprClient() as d:
        await d.save_state("postgres", user["id"], user)
    return user

@app.get("/user/{user_id}")
async def get_user(user_id: str):
    with DaprClient() as d:
        user = await d.get_state("postgres", user_id)
    return user
