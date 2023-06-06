export interface ITurnDto {
    id?: string;
    name?: string;
    topic?: string;
    estimated_time?: string;
    current_turn?: string;
    turns?: IClientDto[];
    created_date?: string;
    modificated_date?: string;
    deleted_date?: string;
}

export interface IClientDto {
    client_id?: string;
    status?: string;
    turn_number?: string;
    created_date?: string;
    modificated_date?: string;
    deleted_date?: string;
}