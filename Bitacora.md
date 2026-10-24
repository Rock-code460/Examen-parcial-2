 ¿Por qué usar un id único en lugar de identificar al personaje por su nombre? ¿Qué pasaría si dos
personajes se llaman igual?
El uso de id garantiza que cada personaje tenga un dato que sea completamente único, ya que múltiples personajes tienen la posibilidad de compartir el mismo nombre. Si dos personajes llegaran a tener el mismo nombre, el código no sabría distinguir uno entre el otro, y solo actuaria sobre el primer resultado que encuentre. Haciendo funciones como find() solo devolver uno de 2 resultados.

¿Qué pasa si la URL de la imagen no existe? Propón un comportamiento de respaldo (por ejemplo,
mostrar iniciales).

¿Es seguro guardar información sensible en localStorage? ¿Quién más puede leerla? ¿Qué datos nunca
guardarías ahí?
No,
