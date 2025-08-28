package pt.cursinhoinsercao.portalaluno.service;

import pt.cursinhoinsercao.portalaluno.dto.Login;
import pt.cursinhoinsercao.portalaluno.entity.Usuario;
import pt.cursinhoinsercao.portalaluno.dao.UsuarioDAO;

public class UsuarioService {

    private UsuarioDAO usuarioDAO = new UsuarioDAO();

    public Usuario cadastrar(Usuario novoUsuario) throws Exception {

        // Verifica se o email já está em uso
        Usuario usuarioExistente = usuarioDAO.buscarPorEmail(novoUsuario.getEmail());

        if (usuarioExistente != null) {
            // Se o usuário já existe, lançamos uma exceção com uma mensagem clara.
            throw new Exception("O e-mail informado já está em uso.");
        }

        // Validação de dados
        if (novoUsuario.getNome() == null || novoUsuario.getNome().trim().isEmpty()) {
            throw new Exception("O nome do usuário não pode ser vazio.");
        }
        if (novoUsuario.getSenha() == null || novoUsuario.getSenha().length() < 6) {
            throw new Exception("A senha deve ter no mínimo 6 caracteres.");
        }

        usuarioDAO.salvar(novoUsuario);
        return novoUsuario;

    }

    public Usuario login(Login dadosLogin) throws Exception {

        //Buscar o user pelo email usando o dao
        Usuario usuarioDoBanco = usuarioDAO.buscarPorEmail(dadosLogin.getEmail());

        //verifica se o user existe e se a senha corresponde
        if (usuarioDoBanco != null && usuarioDoBanco.getSenha().equals(dadosLogin.getSenha())) {
            return usuarioDoBanco;
        }

        // Se caso nao existir o user, ele lança essa exceção
        throw new Exception("E-mail ou senha inválidos.");
    }

}