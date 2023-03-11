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
        value = await d.get_state("statestore", key)
    return {"key": key, "value": value}

@app.put("/state/{key}")
async def write_state(key: str, value: str):
    with DaprClient() as d:
        await d.save_state("statestore", key, value)
    return {"key": key, "value": value}
