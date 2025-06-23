const {query} = require('../config/db');

class Curso {
    static async getAllCursos() {
        const result = await query(
            `SELECT 
                c.id, 
                c.nome, 
                c.sigla, 
                c.descricao, 
                c.id_coordenador, 
                p.nome AS nome_coordenador 
             FROM public.cursos c
             LEFT JOIN public.professor p ON c.id_coordenador = p.id`
        );
        return result.rows;
    }

    static async getCursoById(id) {
        const result = await query(
            'SELECT * FROM public.cursos WHERE id = $1',
            [id]
        );
        return result.rows;
    }

    static async insert({nome, sigla, descricao, id_coordenador}) {
        const result = await query(
            'INSERT INTO public.cursos (nome, sigla, descricao, id_coordenador) VALUES ($1, $2, $3, $4) RETURNING *',
            [nome, sigla, descricao, id_coordenador]
        );
        return result.rows[0];
    }

    static async update(id, {nome, sigla, descricao, id_coordenador}) {
        const result = await query(
            'UPDATE public.cursos SET nome = $1, sigla = $2, descricao = $3, id_coordenador = $4 WHERE id = $5 RETURNING *',
            [nome, sigla, descricao, id_coordenador, id]
        );
        return result.rows[0];
    }

    static async delete(id) {
        const result = await query(
            'DELETE FROM public.cursos WHERE id = $1 RETURNING id',
            [id]
        );
        return result.rows[0];
    }
}

module.exports = Curso;