using BancoMaster.BLL.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BancoMaster.DAL.Repositorio
{
    public class BdContexto : DbContext
    {
        public BdContexto(DbContextOptions<BdContexto> options) : base(options) {}
        

        public DbSet<Rota> Rotas { get; set; }

    }
}
