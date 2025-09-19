export function generateMockSchema() {
	return {
		id: "schema-001",
		name: "Testemunho Público - Estrutura",
		description: "Schema base dos locais e horários de testemunho público",
		createdAt: "2024-08-01T00:00:00Z",
		updatedAt: "2024-08-15T00:00:00Z",
		days: [
			{
				id: "83a0894d-86aa-41e7-9fce-9f4b2e70a10f",
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
				id: "1474a349-f617-4a60-8642-887134338937",
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
				id: "75f44414-b6c5-4510-96ac-f0ba9f57832c",
				weekday: "wednesday",
				slots: [
					{ placeId: 4, placeName: "Tribunal - Chafariz", time: "09:30-12:00" },
				],
			},
			{
				id: "a7de6f6e-b0bd-44e7-bda6-80533fce38af",
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
				id: "05507693-c6ea-4ca4-bdd5-9f214be6e321",
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
				id: "b6ca9b73-1282-423c-8180-bd098de7bd3f",
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
				id: "c85036ef-c16b-4af1-a304-acdacdcc660e",
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
