export type Actor = {
	_id: string;
	uid: string;
	nom: string;
	prenom: string;
	groupe: string;
	civ?: string;
	trigramme?: string;
	dateNaissance?: string;
	profession?: string;
	circo?: string;
	departement?: string;
	place?: string;
};

export type Document = {
	_id: string;
	uid: string;
	denominationStructurelle: string;
	titre: string;
	titreCourt: string;
	dateDepot: string;
	count: number;
};
