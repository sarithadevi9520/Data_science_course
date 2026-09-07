import asyncio
async def first():
    print("fisrt task")
    await asyncio.sleep(3)
    print("First task done")
async def second():
    print("second task")
    await asyncio.sleep(3)
    print("second task done")
async def main():
    await asyncio.gather(first(), second())

asyncio.run(main())