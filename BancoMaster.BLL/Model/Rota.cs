using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BancoMaster.BLL.Model
{
    public class Rota
    {
        public int Id { get; set; }
        public string? Origem { get; set; }
        public string? Destino { get; set; }
        public decimal Valor { get; set; }

        public static implicit operator List<object>(Rota? v)
        {
            throw new NotImplementedException();
        }
    }
}
