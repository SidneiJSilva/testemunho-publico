export function generateMockSchema() {
	return {
		id: "schema-001",
		name: "Testemunho Público - Estrutura",
		description: "Schema base dos locais e horários de testemunho público",
		createdAt: "2024-08-01T00:00:00Z",
		updatedAt: "2024-08-15T00:00:00Z",
		days: [
			{
				weekday: "monday",
				slots: [
					{ placeId: 1, placeName: "Furadouro - CENTRO", time: "18:00-19:30" },
					{ placeId: 2, placeName: "Jardim Cáster", time: "18:00-19:30" },
					{
						placeId: 3,
						placeName: "Jardim Estação (semáforos)",
						time: "18:00-19:30",
					},
				],
			},
			{
				weekday: "tuesday",
				slots: [
					{
						placeId: 3,
						placeName: "Jardim Estação (semáforos)",
						time: "09:30-12:00",
					},
					{ placeId: 4, placeName: "Tribunal - Chafariz", time: "14:45-17:00" },
				],
			},
			{
				weekday: "wednesday",
				slots: [
					{ placeId: 4, placeName: "Tribunal - Chafariz", time: "09:30-12:00" },
				],
			},
			{
				weekday: "thursday",
				slots: [
					{ placeId: 5, placeName: "Mercado - Capela", time: "09:45-12:00" },
					{
						placeId: 6,
						placeName: "Mercado - Estacionamento",
						time: "09:45-12:00",
					},
				],
			},
			{
				weekday: "friday",
				slots: [
					{ placeId: 4, placeName: "Tribunal - Chafariz", time: "09:30-12:00" },
					{ placeId: 1, placeName: "Furadouro - CENTRO", time: "18:00-19:30" },
					{
						placeId: 8,
						placeName: "Furadouro - SUL (beira-mar)",
						time: "18:00-19:30",
					},
					{ placeId: 2, placeName: "Jardim Cáster", time: "18:00-19:30" },
				],
			},
			{
				weekday: "saturday",
				slots: [
					{ placeId: 2, placeName: "Jardim Cáster", time: "09:45-12:00" },
					{
						placeId: 3,
						placeName: "Jardim Estação (semáforos)",
						time: "09:45-12:00",
					},
					{ placeId: 5, placeName: "Mercado - Capela", time: "09:45-12:00" },
					{
						placeId: 6,
						placeName: "Mercado - Estacionamento",
						time: "09:45-12:00",
					},
					{ placeId: 1, placeName: "Furadouro - CENTRO", time: "14:45-16:45" },
				],
			},
			{
				weekday: "sunday",
				slots: [
					{ placeId: 1, placeName: "Furadouro - CENTRO", time: "09:45-12:00" },
					{
						placeId: 7,
						placeName: "Furadouro - NORTE (beira-mar)",
						time: "09:45-12:00",
					},
					{
						placeId: 8,
						placeName: "Furadouro - SUL (beira-mar)",
						time: "09:45-12:00",
					},
					{
						placeId: 9,
						placeName: "Furadouro - CENTRO (beira-mar)",
						time: "09:45-12:00",
					},
					{ placeId: 2, placeName: "Jardim Cáster", time: "09:45-12:00" },
					{
						placeId: 10,
						placeName: "Ovar - Mercado (Feira Antiguidades)",
						time: "09:45-12:00",
					},
					{ placeId: 4, placeName: "Tribunal - Chafariz", time: "09:45-12:00" },
					{ placeId: 11, placeName: "Válega - Jardim", time: "09:45-12:00" },
				],
			},
		],
	};
}
