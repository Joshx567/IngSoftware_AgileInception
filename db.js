export const estacionesDB = [
    {
      id: 1,
      nombre: "Estación Principal",
      ubicacion: "Av. Heroínas, Esq. Lanza",
      horaApertura: "06:00",
      horaCierre: "22:00",
      combustibles: {
        gasolina: {
          disponible: false,
          litros: 0,
          tiempoPromedioCarga: 5
        },
        diesel: {
          disponible: false,
          litros: 0,
          tiempoPromedioCarga: 8
        },
        gnv: {
          disponible: false,
          litros: 0,
          tiempoPromedioCarga: 8
        }
      },
      ticketsCombustible: []
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
          tiempoPromedioCarga: 5
        },
        diesel: {
          disponible: true,
          litros: 2000,
          tiempoPromedioCarga: 3
        },
        gnv: {
          disponible: true,
          litros: 3200,
          tiempoPromedioCarga: 3
        }
      },
      ticketsCombustible: [
        {
          idTicket: 2,
          idEstacion: 2,
          nombreEstacion: "Estación Norte",
          direccionEstacion: "Av. America",
          tipoCombustible: "diesel",
          cantidadIngresada: 200,
          operario: "Juan Gómez",
          fecha: new Date().toLocaleDateString(),
          hora: "09:15:00",
          estado: "activo",
          ticketsConductores:[
          ]
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
          hora: "10:45:00",
          estado: "activo",
          ticketsConductores:[
            {
              nombre: "María Pérez",
              ci: "1234567",
              placa: "XYZ-123",
              monto: 20,
              horaAtencion: "11:00:00"
            },
            {
              nombre: "Carlos López",
              ci: "7654321",
              placa: "ABC-789",
              monto: 10,
              horaAtencion: "11:10:00"
            }
          ]
        }
      ]
    },
    {
      id: 3,
      nombre: "Estación Sur",
      ubicacion: "Av. Circunvalacion",
      horaApertura: "08:00",
      horaCierre: "13:00",
      combustibles: {
        gasolina: {
          disponible: false,
          litros: 0,
          tiempoPromedioCarga: 5
        },
        diesel: {
          disponible: false,
          litros: 0,
          tiempoPromedioCarga: 8
        },
        gnv: {
          disponible: true,
          litros: 50,
          tiempoPromedioCarga: 8
        }
      },
      ticketsCombustible: []
    }
  ];


export const operariosDB = [
  { 
    id: 1, 
    nombre: "Carlo Morales", 
    usuario: "Cmorales", 
    contraseña: "op1234"
  },
  { 
    id: 2, 
    nombre: "Luis Torres", 
    usuario: "Ltorres", 
    contraseña: "op5678" 
  },
  { 
    id: 3, 
    nombre: "Carla Ruiz", 
    usuario: "Cruiz", 
    contraseña: "op101" 
  }
];

export const conductoresDB = [
{
  ci: "7654321",
  nombre: "Carlos",
  contraseña: "cl1234",
  ticketsHistorial: [
    {
      idTicket: "45231",
      estacionDeCarga: "Estación Norte",
      fecha: "2025-05-24",
      montoCargado: 15,
      horaCarga: "09:30:00"
    },
    {
      idTicket: "45232",
      estacionDeCarga: "Estación Norte",
      fecha: "2025-05-25",
      montoCargado: 20,
      horaCarga: "10:15:00"
    },
    {
      idTicket: "45233",
      estacionDeCarga: "Estación Sur",
      fecha: "2025-05-25",
      montoCargado: 25,
      horaCarga: "12:00:00"
    },
    {
      idTicket: "45234",
      estacionDeCarga: "Estación Este",
      fecha: "2025-05-26",
      montoCargado: 30,
      horaCarga: "14:45:00"
    }
  ]
},
  { 
    ci: "5484555", 
    nombre: "Sofía Herrera", 
    contraseña: "sh1234",
    ticketsHistorial: []
  },
  { 
    ci: "5266789", 
    nombre: "Javier Paredes", 
    contraseña: "jp1234",
    ticketsHistorial: []
  }
];
