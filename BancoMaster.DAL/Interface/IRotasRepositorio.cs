using BancoMaster.BLL.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BancoMaster.DAL.Interface
{
    public interface IRotasRepositorio : IRepositorioGenerico<Rota>
    {
        IQueryable<Rota> FiltrarRotas(string origem);

        IQueryable<Rota> BuscaMenorValorRota(string origem, string destino);

        Task<List<Rota>> PegarPelaOrigemDestino(string origem, string destino);
    }
}
