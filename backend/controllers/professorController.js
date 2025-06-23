const Professor = require('../models/Professor');

exports.getProfessores = async (req, res) => {
    try {
        const professores = await Professor.getAllProfessores();
        res.status(200).json(professores);
    } catch (error) {
        console.error('Error fetching professores:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.getProfessor = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const professor = await Professor.getProfessorById(id);
        if (professor.length === 0) {
            return res.status(404).json({ error: 'Professor not found' });
        }
        console.log(professor);
        res.json(professor);
    } catch (error) {
        console.error('Error fetching professor:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.insertProfessor = async (req, res) => {
    const { nome, email, sala } = req.body;
    try {
        const newProfessor = await Professor.insert({ nome, email, sala });
        res.status(201).json(newProfessor);
    } catch (error) {
        console.error('Error inserting professor:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.updateProfessor = async (req, res) => {
    const id = parseInt(req.params.id);
    const { nome, email, sala } = req.body;
    try {
        const updatedProfessor = await Professor.update(id, { nome, email, sala });
        if (!updatedProfessor) {
            return res.status(404).json({ error: 'Professor not found' });
        }
        console.log(updatedProfessor);
        res.status(200).json(updatedProfessor);
    } catch (error) {
        console.error('Error updating professor:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.deleteProfessor = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const deletedProfessor = await Professor.delete(id);
        if (!deletedProfessor) {
            return res.status(404).json({ error: 'Professor not found' });
        }
        res.status(200).json({ message: 'Professor deleted successfully' });
    } catch (error) {
        console.error('Error deleting professor:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};