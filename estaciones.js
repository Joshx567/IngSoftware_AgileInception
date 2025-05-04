export const estacionesDB = [
    {
      id: 1,
      nombre: "Estación Principal",
      ubicacion: "Av. Libertador",
      horaApertura: "06:00",
      horaCierre: "22:00",
      combustibles: {
        gasolina: {
          disponible: false,
          litros: 0,
          tiempoEspera: 5
        },
        diesel: {
          disponible: false,
          litros: 0,
          tiempoEspera: 8
        },
        gnv: {
          disponible: false,
          litros: 0,
          tiempoEspera: 8
        }
      },
      tickets: []
    },
    {
      id: 2,
      nombre: "Estación Norte",
      ubicacion: "Av. America",
      horaApertura: "08:00",
      horaCierre: "19:00",
      combustibles: {
        gasolina: {
          disponible: false,
          litros: 0,
          tiempoEspera: 5
        },
        diesel: {
          disponible: true,
          litros: 2000,
          tiempoEspera: 3
        },
        gnv: {
          disponible: true,
          litros: 3200,
          tiempoEspera: 3
        }
      },
      tickets: [
        {
          idTicket: 2,
          idEstacion: 2,
          nombreEstacion: "Estación Norte",
          direccionEstacion: "Av. America",
          tipoCombustible: "diesel",
          cantidadIngresada: 200,
          operario: "Juan Gómez",
          fecha: new Date().toLocaleDateString(),
          hora: "09:15:00"
        },
        {
          idTicket: 3,
          idEstacion: 2, 
          nombreEstacion: "Estación Norte",
          direccionEstacion: "Av. America",
          tipoCombustible: "gnv",
          cantidadIngresada: 30,
          operario: "Luis Sánchez",
          fecha: new Date().toLocaleDateString(),
          hora: "10:45:00"
        }
      ]
    },
    {
      id: 3,
      nombre: "Estación Principal",
      ubicacion: "Av. Circunvalacion",
      horaApertura: "08:00",
      horaCierre: "13:00",
      combustibles: {
        gasolina: {
          disponible: false,
          litros: 0,
          tiempoEspera: 5
        },
        diesel: {
          disponible: false,
          litros: 0,
          tiempoEspera: 8
        },
        gnv: {
          disponible: true,
          litros: 50,
          tiempoEspera: 8
        }
      },
      tickets: []
    }
  ];