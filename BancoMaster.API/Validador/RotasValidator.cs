using BancoMaster.BLL.Model;
using FluentValidation;

namespace BancoMaster.API.Validador
{
    public class RotasValidator : AbstractValidator<Rota>
    {
        public RotasValidator()
        {
            RuleFor(r => r.Origem)
                .NotEmpty().WithMessage("É obrigatório digitar a Origem da Rota")
                .NotNull().WithMessage("É obrigatório digitar a Origem da Rota")
                .MinimumLength(1).WithMessage("Usar mais Caracteres")
                .MaximumLength(10).WithMessage("Usar menor Caracteres");


            RuleFor(r => r.Destino)
                .NotEmpty().WithMessage("É obrigatório digitar a Destino da Rota")
                .NotNull().WithMessage("É obrigatório digitar a Destino da Rota")
                .MinimumLength(1).WithMessage("Usar mais Caracteres")
                .MaximumLength(10).WithMessage("Usar menor Caracteres");

            RuleFor(r => r.Valor)
                .NotEmpty().WithMessage("Preencha a Valor")
                .NotNull().WithMessage("Preencha a Valor")
                .InclusiveBetween(0, decimal.MaxValue).WithMessage("Valor Inválido");

        }
    }
}
