using BancoMaster.DAL.Interface;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BancoMaster.DAL.Repositorio
{
    public class RepositorioGenerico<TEntity> : IRepositorioGenerico<TEntity> where TEntity : class
    {
        private readonly BdContexto _context;

        public RepositorioGenerico(BdContexto context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public IQueryable<TEntity> PegarTodos()
        {
            try
            {
                return _context.Set<TEntity>();

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }


        public async Task<TEntity> PegarPeloId(int Id)
        {
            try
            {
                var entity = await _context.Set<TEntity>().FindAsync(Id);
                return entity;

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
                

        public async Task Inserir(TEntity entity)
        {
            try
            {
                _context.Set<TEntity>().AddAsync(entity);
                await _context.SaveChangesAsync();

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public async Task Inserir(List<TEntity> entity)
        {
            try
            {
                //Comando abaixo Salva Vários Registros
                _context.Set<TEntity>().AddRangeAsync(entity);
                await _context.SaveChangesAsync();

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public async Task Atualizar(TEntity entity)
        {
            try
            {
                var registro = _context.Set<TEntity>().Update(entity);
                registro.State = EntityState.Modified;
                await _context.SaveChangesAsync();


            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        
        public async Task Excluir(int id)
        {
            try
            {
                var entity = await PegarPeloId(id);
                _context.Set<TEntity>().Remove(entity);
                await _context.SaveChangesAsync();

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public async Task Excluir(TEntity entity)
        {
            try
            {

                _context.Set<TEntity>().Remove(entity);
                await _context.SaveChangesAsync();

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
    }
}
