const {query} = require('../config/db');

class Professor {
    static async getAllProfessores() {
        const result = await query(
            'SELECT id as "codigo", nome as "nomeProf", email, sala FROM public.professor'
        );
        return result.rows;
    }

    static async getProfessorById(id) {
        const result = await query(
            'SELECT * FROM public.professor WHERE id = $1',
            [id]
        );
        return result.rows;
    }

    static async insert({nome, email, sala}) {
        const result = await query(
            'INSERT INTO public.professor (nome, email, sala) VALUES ($1, $2, $3) RETURNING *',
            [nome, email, sala]
        );
        return result.rows[0];
    }

    static async update(id, {nome, email, sala}) {
        const result = await query(
            'UPDATE public.professor SET nome = $1, email = $2, sala = $3 WHERE id = $4 RETURNING *',
            [nome, email, sala, id]
        );
        return result.rows[0];
    }

    static async delete(id) {
        const result = await query(
            'DELETE FROM public.professor WHERE id = $1 RETURNING id',
            [id]
        );
        return result.rows[0];
    }
}

module.exports = Professor;