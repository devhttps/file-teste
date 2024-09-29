import time

# Creating the decorator
def timer_decorator(func):
    def wrapper(*args, **kwargs):
        start_time = time.time()  # Start time
        result = func(*args, **kwargs)  # Execute the original function
        end_time = time.time()  # End time
        print(f"Function {func.__name__} executed in {end_time - start_time} seconds")
        return result
    return wrapper

# Applying the decorator to a function
@timer_decorator
def slow_function():
    time.sleep(2)  # Simulates a slow function
    print("Slow function executed")

slow_function()
