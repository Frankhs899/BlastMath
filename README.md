# BlastMath

## Descripción

Este proyecto es un juego educativo desarrollado con el objetivo de hacer que el aprendizaje de las tablas de multiplicar sea más interactivo y divertido. Inspirado en juegos clásicos de disparos, el jugador debe disparar a las respuestas correctas de preguntas matemáticas para ganar puntos.

## Funcionalidades Clave

1. **Lienzo y Contexto**:
    - Inicializa un elemento `<canvas>` en el HTML.
    - Obtiene el contexto 2D para dibujar en la pantalla.

2. **Variables del Juego**:
    - Controla el puntaje, la pregunta actual, la respuesta correcta, el estado del juego (jugando, pausado, terminado).
    - Gestiona el cañón del jugador, las balas disparadas, los enemigos (opciones incorrectas), las explosiones y otras variables de control.

3. **Colores**:
    - Objeto para almacenar los colores utilizados en los elementos del juego (fondo, cañón, balas, enemigos, texto, plataforma y explosiones).

4. **Inicialización del Juego**:
    - Reinicia las variables del juego.
    - Genera una nueva pregunta.
    - Configura el bucle principal para actualizar el juego a 60 FPS.
    - Muestra instrucciones iniciales.

5. **Generación de Preguntas**:
    - Crea una pregunta matemática aleatoria (multiplicación) con su respuesta correcta.
    - Genera 3 opciones incorrectas adicionales y las baraja para evitar siempre el mismo orden.

6. **Actualizar el Juego**:
    - El bucle principal del juego limpia el canvas, dibuja el fondo, el cañón, las balas, los enemigos, las explosiones, la pregunta actual y el puntaje.
    - Verifica colisiones.

7. **Dibujar Elementos**:
    - Funciones específicas para dibujar cada elemento del juego en el canvas utilizando el contexto 2D.

8. **Verificar Colisiones**:
    - Comprueba si las balas del jugador colisionan con los enemigos (opciones).
    - Si la respuesta es correcta, aumenta el puntaje y genera una nueva pregunta.
    - Si la respuesta es incorrecta, termina el juego.

9. **Mover Enemigos**:
    - Los enemigos bajan lentamente por la pantalla simulando un acercamiento al jugador.

10. **Fin del Juego**:
    - Muestra una pantalla de "Juego Terminado" con el puntaje final y la opción de reiniciar el juego.

11. **Controles del Jugador**:
    - Mover el cañón a izquierda y derecha con las teclas `A` y `D`.
    - Disparar balas con la barra espaciadora.
    - Pausar/reanudar el juego con la tecla `Enter`.
    - Salir con `Escape` y reiniciar con la tecla `R`.

## Objetivos del Proyecto

- **Interactividad y Diversión**: Hacer que el aprendizaje de las tablas de multiplicar sea más interactivo y entretenido, especialmente para los niños.
- **Tecnologías Utilizadas**: HTML, CSS y JavaScript.

## Instalación y Uso

1. Clona el repositorio:
    ```bash
    git clone https://github.com/Frankhs899/BlastMath.git
    ```
2. Navega al directorio del proyecto:
    ```bash
    cd BlastMath
    ```
3. Abre el archivo `index.html` en tu navegador preferido.

## Contribuciones

¡Las contribuciones son bienvenidas! Si tienes ideas para mejorar el juego o encuentras algún bug, por favor abre un issue o envía un pull request.

---

¡Diviértete aprendiendo y disparando respuestas correctas!
