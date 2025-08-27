package pt.cursinhoinsercao.portalaluno.service;

import pt.cursinhoinsercao.portalaluno.dao.SecaoDAO;
import pt.cursinhoinsercao.portalaluno.entity.Secao;

import java.util.List;

public class SecaoService {

    private SecaoDAO secaoDAO = new SecaoDAO();

    public List<Secao> buscarTodas() {
        return secaoDAO.buscarTodas();
    }

    public Secao buscarPorId(int id) {
        return secaoDAO.buscarPorId(id);
    }

    public Secao criar(Secao novaSecao) throws Exception {

        if (novaSecao.getTexto() == null || novaSecao.getTexto().trim().isEmpty()) {
            throw new Exception("O texto da seção não pode ser vazio");
        }
        secaoDAO.salvar(novaSecao);
        return novaSecao;
    }

    public Secao atualizar(int id, Secao secaoAtualizada) throws Exception {
        Secao secaoExistente = secaoDAO.buscarPorId(id);

        if (secaoExistente == null) {
            throw new Exception("Seção não encontrada com o ID: " + id);
        }

        secaoAtualizada.setId(id);
        secaoDAO.atualizar(secaoAtualizada);
        return secaoAtualizada;
    }

    public void deletar(int id) throws Exception {
        Secao secao = secaoDAO.buscarPorId(id);

        if (secao == null) {
            throw new Exception("Seção não encontrada com o ID: " + id);
        }

        secaoDAO.remover(secao);
    }
}