from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Literal

app = FastAPI(title="Simple Calculator API")

class CalcInput(BaseModel):
    values: List[float]
    operation: Literal["average", "add", "subtract", "multiply", "divide"]

@app.post("/calculate")
def calculate(data: CalcInput):
    nums = data.values
    op = data.operation

    if not nums:
        raise HTTPException(status_code=400, detail="The list of numbers is empty. Please provide at least one number.")

    if op == "average":
        result = sum(nums) / len(nums)
        return {
            "operation": "average",
            "input": nums,
            "result": result,
            "message": f"The average of {nums} is {result}"
        }

    elif op == "add":
        result = sum(nums)
        return {
            "operation": "addition",
            "input": nums,
            "result": result,
            "message": f"The sum of {nums} is {result}"
        }

    elif op == "subtract":
        result = nums[0]
        for num in nums[1:]:
            result -= num
        return {
            "operation": "subtraction",
            "input": nums,
            "result": result,
            "message": f"The result of subtracting {nums[1:]} from {nums[0]} is {result}"
        }

    elif op == "multiply":
        result = 1
        for num in nums:
            result *= num
        return {
            "operation": "multiplication",
            "input": nums,
            "result": result,
            "message": f"The product of {nums} is {result}"
        }

    elif op == "divide":
        result = nums[0]
        try:
            for num in nums[1:]:
                result /= num
        except ZeroDivisionError:
            raise HTTPException(status_code=400, detail="Division by zero is not allowed.")
        return {
            "operation": "division",
            "input": nums,
            "result": result,
            "message": f"The result of sequentially dividing {nums} is {result}"
        }

    else:
        raise HTTPException(status_code=400, detail="Unsupported operation. Use one of: average, add, subtract, multiply, divide.")