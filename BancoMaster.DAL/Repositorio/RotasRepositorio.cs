using BancoMaster.BLL.Model;
using BancoMaster.DAL.Interface;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BancoMaster.DAL.Repositorio
{
    public class RotasRepositorio : RepositorioGenerico<Rota>, IRotasRepositorio
    {
        private readonly BdContexto _context;

        public RotasRepositorio(BdContexto context) : base(context)
        {
            _context = context;
        }

        public IQueryable<Rota> BuscaMenorValorRota(string origem, string destino)
        {
            try
            {   
                 return _context.Rotas.Where(r => r.Origem == origem && r.Destino == destino && r.Valor ==
                        _context.Rotas.Where(r => r.Origem == origem && r.Destino == destino).Min(r => r.Valor));                
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public IQueryable<Rota> FiltrarRotas(string origem)
        {
            try
            {
                var rota = _context.Rotas.Where(c => c.Origem.Contains(origem));
                return rota;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public async Task<List<Rota>> PegarPelaOrigemDestino(string origem, string destino)
        {
            try
            {
                List<Rota> rotas = await _context.Rotas.Where(r => r.Origem == origem && r.Destino ==destino).ToListAsync();

                
                return rotas;

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
    }
}
