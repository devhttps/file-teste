import time

# Criando o decorator
def timer_decorator(func):
    def wrapper(*args, **kwargs):
        start_time = time.time()  # Tempo inicial
        result = func(*args, **kwargs)  # Executa a função original
        end_time = time.time()  # Tempo final
        print(f"Função {func.__name__} executada em {end_time - start_time} segundos")
        return result
    return wrapper

# Aplicando o decorator a uma função
@timer_decorator
def slow_function():
    time.sleep(2)  # Simula uma função lenta
    print("Função lenta executada")

slow_function()
