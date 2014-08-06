# Power ups

## Attack
 - frozen: congela durante un tiempo la pantalla
 - basura: random bloques, de 3 a 7 bloques en columnas distintas
 - agujeros: random agujeros, de 3 a 7 agujeros en distintos lugares
 - thief: roba puntos al otro
 - upside-down: da vuelta el espacio de juego (las fichas caen para arriba)
 - invertir rotación: invierte el sentido de rotación de las piezas
 - invertir controles: los controles responden de otra manera: por ejemplo, para abajo rota la pieza
 - eliminar columna
 - slow motion: la pieza baja super lento
 - cover: pone algo con poca transparencia que tapa el espcacio de juego
 - shrink: achica mucho el espacio de juego
 - liar: miente acerca de la siguiente pieza
 - lifter: levanta el piso de abajo
 - fixed: no deja rotar la pieza
 - random: cada rotación cambia la pieza a otra. Por ej, al girar la I cambia a la J (random)


## Defense
 - anti-frozen: descongela antes del tiempo
 - eliminar filas
 - blocker: bloquea automáticamente el siguiente ataque
 - anti-lifter: baja el piso automáticamente


# Score

## Por pieza
Cuando cae una pieza, se le asigna un puntaje. Cuanto menos tarde la pieza en
caer, mayor será el puntaje. De este modo, la primer pieza en la velocidad más
lenta tendrá el menor puntaje, mientras que si se juega a máxima velocidad en
la parte superior del tablero, el puntaje será mayor.

Las piezas constan de un puntaje mínimo y uno máximo. El máximo posiblemente
sea imposible de alcanzar (un tiempo de 0), mientras que el mínimo se obtendrá
luego de un tiempo determinado (sin importar cuanto tiempo extra tarde). En
cualquier situación intermedia, se interpola el puntaje.

### Ejemplo:
 - Min: 10
 - Max: 50
 - Tiempo: 10 seg.

Si tarda:
 - 0 segundos, obtendrá 50 puntos.
 - 5 segundos, obtendrá 30 puntos.
 - 10 o más segundos, obtendrá 10 puntos.

## Por lineas completas
Cuando se completan una o más líneas, se obtienen puntos extra (se siguen obteniendo los puntos por pieza).
 - 1 línea: 50 puntos.
 - 2 líneas: 120 puntos.
 - 3 líneas: 200 puntos.
 - 4 líneas: 400 puntos.
