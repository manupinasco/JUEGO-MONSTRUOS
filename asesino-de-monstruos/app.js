new Vue({
    el: '#app',
    data: {
        saludJugador: 100,
        saludMonstruo: 100,
        hayUnaPartidaEnJuego: false,
        turnos: [], //es para registrar los eventos de la partida
        esJugador: false,
        rangoAtaque: [3, 10],
        rangoAtaqueEspecial: [10, 20],
        rangoAtaqueDelMonstruo: [5, 12],
    }, 

    methods: {
        getSalud(salud) {
            return `${salud}%`
        },
        empezarPartida() {

            this.resetearDatos();
            this.hayUnaPartidaEnJuego = true;
            
        },
        atacar() {
            var danio = this.calcularHeridas(this.rangoAtaque)
            this.saludMonstruo -= danio;

            this.turnos.unshift({
                esJugador: true,
                text: 'Golpeaste al monstruo en ' + danio + '%'
            });

            if(this.verificarGanador()) {
                return;
            }
            
            this.ataqueDelMonstruo();
        },

        ataqueEspecial() {
            var danio = this.calcularHeridas(this.rangoAtaqueEspecial)
            this.saludMonstruo -= danio;

            this.turnos.unshift({
                esJugador: true,
                text: 'Golpeaste al monstruo en ' + danio + '%'
            });

            if(this.verificarGanador()) {
                return;
            }
            
            this.ataqueDelMonstruo();
        },

        curar() {
            var recuperacion;
            if(this.saludJugador <= 90) {
                this.saludJugador += 10;
                recuperacion = 10;
            }
            else {
                recuperacion = 100 - this.saludJugador;
                this.saludJugador = 100;
            }

            this.turnos.unshift({
                esJugador: true,
                text: 'Te curaste en un ' + recuperacion + '%'
            });

            this.ataqueDelMonstruo();
        },

        registrarEvento(evento) {
            
        },

        resetearDatos() {
            this.turnos = [];
            this.saludJugador = 100;
            this.saludMonstruo = 100
        },

        terminarPartida() {
            this.resetearDatos();
            this.hayUnaPartidaEnJuego = false;
        },

        ataqueDelMonstruo() {
            var danio = this.calcularHeridas(this.rangoAtaqueDelMonstruo)
            this.saludJugador -= danio;
            this.turnos.unshift({
                esJugador: false,
                text: 'El monstruo golpea por ' + danio + '%'
            });
            this.verificarGanador()
            
        
        },

        calcularHeridas(rango) {
            return Math.max(Math.floor(Math.random() * rango[1]) + 1, rango[0])

        },
        verificarGanador() {
            if(this.saludMonstruo <= 0) {
                if(confirm('Ganaste! ¿Jugar de nuevo?')) {
                    this.empezarPartida()
                }
                else {
                    this.terminarPartida();
                }
                return true;
            }
            else if(this.saludJugador <= 0) {
                if(confirm('Perdiste! ¿Jugar de nuevo?')) {
                    this.empezarPartida();
                }
                else {
                    this.terminarPartida();
                }
                return true;
            }
            
            
            return false;
        },
        cssEvento(turno) {
            //Este return de un objeto es prque vue asi lo requiere, pero ponerlo acá queda mucho mas entendible en el codigo HTML.
            return {
                'player-turno': turno.esJugador,
                'monster-turno': !turno.esJugador
            }
        }
    },

    computed: {
    }
});