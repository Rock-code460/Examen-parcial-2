 ¿Por qué usar un id único en lugar de identificar al personaje por su nombre? ¿Qué pasaría si dos
personajes se llaman igual?
El uso de id garantiza que cada personaje tenga un dato que sea completamente único, ya que múltiples personajes tienen la posibilidad de compartir el mismo nombre. Si dos personajes llegaran a tener el mismo nombre, el código no sabría distinguir uno entre el otro, y solo actuaria sobre el primer resultado que encuentre. Haciendo funciones como find() solo devolver uno de 2 resultados.

¿Qué pasa si la URL de la imagen no existe? Propón un comportamiento de respaldo (por ejemplo,
mostrar iniciales).
El navegador intenta renderizar la imagen, pero solo se mostrara el icono de una imagen rota. Para tener un respaldo a esta imagen, se puede agregar una imagen alternativa que es seguro que vaya a funcionar, dentro del mismo bloque de la imagen inicial, que solo corre si la imagen inicial no carga.

¿Es seguro guardar información sensible en localStorage? ¿Quién más puede leerla? ¿Qué datos nunca
guardarías ahí?
No es seguro, localStorage es públicamente accesible mediante la consola del navegador, desplegando toda la informacion guardada dentro. Es importante nunca incluir datos sensibles o personales dentro de localStorage.

¿Conviene guardar todo el arreglo en una sola clave de localStorage o un personaje por clave? Compara
ventajas y desventajas
Es muy intuitivo. Al recargar la página, haces un único JSON.parse y obtienes todo tu conjunto de datos listo para trabajar. Al tener los datos como un Array en JavaScript, puedes usar directamente funciones potentes y limpias como .filter(). Usando múltiples claves, implicaría hacer modificaciones a claves individuales, y puede causar confusión al saber exactamente que clave afectar con modificaciones.

Tu aplicación vive en GitHub Pages. Si un compañero abre tu URL, ¿verá tus personajes? Explica por qué
y qué implica para el diseño de la aplicación.
Si, un compañero debería poder visualizar las tarjetas de personajes, gracias al localStorage se generan los registros predeterminados como una base de la pagina, para que no comience basia. Posteriormente se puede modificar la cuadricula localmente, con los cambios deseados. Cada persona que visite el enlace interactúa con su propio entorno aislado. Si el propósito del proyecto fuera compartir una misma colección en tiempo real entre varios usuarios, el diseño actual requeriría una migración de arquitectura hacia una solución con base de datos en la nube.
