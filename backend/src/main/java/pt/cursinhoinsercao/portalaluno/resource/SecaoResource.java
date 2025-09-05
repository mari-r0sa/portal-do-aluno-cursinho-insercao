package pt.cursinhoinsercao.portalaluno.resource;

import pt.cursinhoinsercao.portalaluno.entity.Secao;
import pt.cursinhoinsercao.portalaluno.service.SecaoService;
import pt.cursinhoinsercao.portalaluno.seguranca.Seguranca;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("secoes")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class SecaoResource {

    private SecaoService secaoService = new SecaoService();

    //Qualquer um pode ver as seções na homepage.
    @GET
    public Response buscarTodas() {
        List<Secao> secoes = secaoService.buscarTodas();
        return Response.ok(secoes).build();
    }

    @GET
    @Path("/{id}") // O {id} é um parâmetro que será capturado da URL
    public Response buscarPorId(@PathParam("id") int id) {
        Secao secao = secaoService.buscarPorId(id);
        if (secao != null) {
            return Response.ok(secao).build();
        }
        return Response.status(Response.Status.NOT_FOUND).build();
    }

    //Apenas admins podem criar seções.
    @POST
    @Seguranca
    public Response criar(Secao novaSecao) {
        try {
            Secao secaoCriada = secaoService.criar(novaSecao);
            return Response.status(Response.Status.CREATED).entity(secaoCriada).build();
        } catch (Exception e) {
            return Response.status(Response.Status.BAD_REQUEST).entity(e.getMessage()).build();
        }
    }

    //Apenas admins podem atualizar seções.
    @PUT
    @Path("/{id}")
    @Seguranca
    public Response atualizar(@PathParam("id") int id, Secao secaoAtualizada) {
        try {
            Secao secao = secaoService.atualizar(id, secaoAtualizada);
            return Response.ok(secao).build();
        } catch (Exception e) {
            return Response.status(Response.Status.BAD_REQUEST).entity(e.getMessage()).build();
        }
    }

    //Apenas admins podem remover seções.
    @DELETE
    @Path("/{id}")
    @Seguranca
    public Response deletar(@PathParam("id") int id) {
        try {
            secaoService.deletar(id);
            return Response.noContent().build(); // HTTP 204 No Content é a resposta padrão para DELETE bem-sucedido
        } catch (Exception e) {
            return Response.status(Response.Status.BAD_REQUEST).entity(e.getMessage()).build();
        }
    }
}
