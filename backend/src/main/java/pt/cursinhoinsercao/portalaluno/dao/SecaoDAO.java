package pt.cursinhoinsercao.portalaluno.dao;

import pt.cursinhoinsercao.portalaluno.Secao;
import pt.cursinhoinsercao.portalaluno.util.JPAUtil;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import java.util.List;

public class SecaoDAO {

    public void salvar(Secao secao) {
        EntityManager em = JPAUtil.getEntityManager();
        try {
            em.getTransaction().begin();
            em.persist(secao);
            em.getTransaction().commit();
        } finally {
            em.close();
        }
    }

    public Secao buscarPorId(int id) {
        EntityManager em = JPAUtil.getEntityManager();
        try {
            return em.find(Secao.class, id);
        } finally {
            em.close();
        }
    }

    public List<Secao> buscarTodas() {
        EntityManager em = JPAUtil.getEntityManager();
        try {
            String jpql = "select s from Secao s";
            TypedQuery<Secao> query = em.createQuery(jpql, Secao.class);
            return query.getResultList();
        } finally {
            em.close();
        }
    }

    public void atualizar(Secao secao) {
        EntityManager em = JPAUtil.getEntityManager();
        try {
            em.getTransaction().begin();
            em.merge(secao);
            em.getTransaction().commit();
        } finally {
            em.close();
        }
    }

    public void remover(Secao secao) {
        EntityManager em = JPAUtil.getEntityManager();
        try {
            em.getTransaction().begin();
            em.remove(em.merge(secao));
            em.getTransaction().commit();
        } finally {
            em.close();
        }
    }
}