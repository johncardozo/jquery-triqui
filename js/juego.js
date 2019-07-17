$(function(){

    // Valores iniciales
    const vacio = '';
    var tablero = [
                    [vacio, vacio, vacio],
                    [vacio, vacio, vacio],
                    [vacio, vacio, vacio]
                    ];
    var turnoActual = 'X';
    var ganador = vacio;

    // Oculta el botón de reiniciar
    $('#buttonReiniciar').hide();

    // Click en una casilla
    $('td').click(function(){

        // Obtiene la celda
        let celda = $(this);

        // Obtiene el id de la celda
        let fila = celda.attr('fila');
        let col = celda.attr('col');

        // Obtiene el valor de la celda en el tablero
        let valorPosicion = tablero[fila][col];

        // Verifica si se puede jugar en la celda seleccionada
        if(valorPosicion === vacio){

            // Juega la posición en el tablero
            tablero[fila][col] = turnoActual;

            // Muestra la jugada en el tablero
            celda.text(turnoActual);

            // Modifica el color de la celda para indicar que ya está jugada
            celda.addClass('celdaJugada');

            // Verifica si hay triqui
            if(
                (tablero[0][0] !== vacio && tablero[0][0] === tablero[0][1] && tablero[0][1] === tablero[0][2]) ||
                (tablero[1][0] !== vacio && tablero[1][0] === tablero[1][1] && tablero[1][1] === tablero[1][2]) ||
                (tablero[2][0] !== vacio && tablero[2][0] === tablero[2][1] && tablero[2][1] === tablero[2][2]) ||

                (tablero[0][0] !== vacio && tablero[0][0] === tablero[1][0] && tablero[1][0] === tablero[2][0]) ||
                (tablero[0][1] !== vacio && tablero[0][1] === tablero[1][1] && tablero[1][1] === tablero[2][1]) ||
                (tablero[0][2] !== vacio && tablero[0][2] === tablero[1][2] && tablero[1][2] === tablero[2][2]) ||

                (tablero[0][0] !== vacio && tablero[0][0] === tablero[1][1] && tablero[1][1] === tablero[2][2]) ||
                (tablero[0][2] !== vacio && tablero[0][2] === tablero[1][1] && tablero[1][1] === tablero[2][0]) 
            ){
                // Muestra el jugador
                $('#textJuego').text('El ganador es ' + turnoActual);
                $('#textJuego').removeClass('alert-primary');
                $('#textJuego').addClass('alert-danger');                

                // Agrega el mensaje al log
                $('#eventos').append('<li class="logAlerta">Ha ganado ' + turnoActual + '</li>');

                // Muestra el botón de reiniciar
                $('#buttonReiniciar').show();

            } else{

                // Agrega el mensaje al log
                $('#eventos').append('<li>' + turnoActual + ' jugó en [' + fila + ',' + col + ']</li>')

                // Cambia el turno
                if(turnoActual === 'X'){
                    turnoActual = 'O';
                }else{
                    turnoActual = 'X';
                }

                // Muestra el nuevo turno
                $('#textJuego').text('Turno de ' + turnoActual);   
            }                   

        }else{
            $('#eventos').append('<li class="logAlerta">La casilla [' + fila + ',' + col + '] ya fue jugada!</li>')
        }

    });

    $('#buttonReiniciar').click(function(){
        console.log('reiniciar!!');

        // Oculta la lista de eventos
        $('#eventos').slideUp('slow', function(){
            // Elimina los elementos del log
            $('#eventos').empty();
        });
    });
});    