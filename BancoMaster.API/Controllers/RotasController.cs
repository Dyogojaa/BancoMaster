using BancoMaster.BLL.Model;
using BancoMaster.DAL.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BancoMaster.API.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class RotasController : ControllerBase
    {
        private readonly IRotasRepositorio _repositorio;

        public RotasController(IRotasRepositorio repositorio)
        {
            _repositorio = repositorio ?? throw new ArgumentNullException(nameof(repositorio));
        }

        [HttpGet]
        //[Authorize(Roles = "Administrador")]
        public async Task<ActionResult<IEnumerable<Rota>>> GetRotas()
        {

            return await _repositorio.PegarTodos().ToListAsync();
        }

        [HttpGet("{id}")]
        //[Authorize(Roles = "Administrador")]
        public async Task<ActionResult<Rota>> GetRota(int id)
        {
            var rota = await _repositorio.PegarPeloId(id);

            if (rota == null)
            {
                return NotFound($"Rota {id} não encontrada!");
            }

            return rota;
        }

        [HttpPut("{id}")]
        //[Authorize(Roles = "Administrador")]
        public async Task<IActionResult> PutRota(int id, Rota rota)
        {
            if (id != rota.Id)
            {
                return BadRequest();
            }

            if (ModelState.IsValid)
            {
                await _repositorio.Atualizar(rota);
                return Ok(new
                {
                    mensagem = $"Rota {rota.Origem} - {rota.Destino}  atualizada com sucesso"

                });

            }
            return BadRequest(ModelState);

        }

        [HttpPost]
        //[Authorize(Roles = "Administrador")]
        public async Task<ActionResult<Rota>> PostRota([FromBody] Rota rota)
        {

            if (ModelState.IsValid)
            {
                await _repositorio.Inserir(rota);
                return Ok(new
                {
                    mensagem = $"Rota {rota.Origem} - {rota.Destino}  Inserida com sucesso"

                });
            }
            return BadRequest(ModelState);

        }


        [HttpDelete("{id}")]
        //[Authorize(Roles = "Administrador")]
        public async Task<IActionResult> DeleteRota(int id)
        {
            var rota = await _repositorio.PegarPeloId(id);

            if (rota == null)
            {
                return NotFound($"Rota {id} não encontrada!");
            }

            await _repositorio.Excluir(id);

            return Ok(new
            {
                mensagem = $"Rota {rota.Origem} - {rota.Destino}  Inserida com sucesso"

            });
        }

        [HttpGet("FiltrarRotas/{origem}")]
        //[Authorize(Roles = "Administrador")]
        public async Task<ActionResult<IEnumerable<Rota>>> FiltrarRotas(string origem)
        {
            return await _repositorio.FiltrarRotas(origem).ToListAsync();
        }

        [HttpGet("BuscaMenorValorRota/{origem}/{destino}")]
        //[Authorize(Roles = "Administrador")]
        public async Task<ActionResult<Rota>> BuscaMenorValorRota(string origem, string destino)
        {
            try
            {
                var rota = await _repositorio.PegarPelaOrigemDestino(origem, destino);

                if (rota.Count == 0)
                {
                    return NotFound($"Rota Origem:{origem} - Destino: {destino} Não econtrada!");
                }
                else
                {
                    var menoValorRota = await _repositorio.BuscaMenorValorRota(origem, destino).ToListAsync();
                    return Ok(menoValorRota);
                }
            }
            catch (Exception ex)
            {

                throw ex;
            }
            
        }


    }
}
