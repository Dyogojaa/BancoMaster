using BancoMaster.API.Validador;
using BancoMaster.BLL.Model;
using BancoMaster.DAL.Interface;
using BancoMaster.DAL.Repositorio;
using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.EntityFrameworkCore;
using NuGet.Configuration;
using System.Text;

var builder = WebApplication.CreateBuilder(args);
var myAllowSpecificOrigins = "myAllowSpecificOrigins";
// Add services to the container.

builder.Services.AddCors();
builder.Services.AddSpaStaticFiles(diretorio =>
{
    diretorio.RootPath = "TotalControle-UI";
});




builder.Services.AddControllers()
    .ConfigureApiBehaviorOptions(options =>
    {
        options.SuppressModelStateInvalidFilter = true;
    })
    .AddFluentValidation()
    .AddJsonOptions(opcoes =>
    {
        opcoes.JsonSerializerOptions.IgnoreNullValues = true;
    })
    .AddNewtonsoftJson(opcoes =>
    {
        opcoes.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
    });


// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();



//Injenção de Dependencia do SQL Server
builder.Services.AddDbContext<BdContexto>(options =>
               options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));



////Injenção do AutoMapper e Classe de Repositorio do Cliente
//IMapper mapper = MappingConfig.RegisterMaps().CreateMapper();
//builder.Services.AddSingleton(mapper);
//builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());


//Registro dos Respositorios
builder.Services.AddScoped<IRotasRepositorio, RotasRepositorio>();

//Registros das Validações
builder.Services.AddTransient<IValidator<Rota>, RotasValidator>();


builder.Services.AddCors(options =>
{
    options.AddPolicy(name: myAllowSpecificOrigins,
        builder =>
        {
            builder.WithOrigins("http://localhost:4200")
            .AllowAnyMethod()
            .AllowAnyHeader();
        });
});



var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors(options =>
{
    options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
});

app.UseHttpsRedirection();


//Para utilizar o Authentication sempre desde estar antes do Authorization
//Se utilizar diferente disso, não irá funcionar
app.UseAuthentication();
app.UseAuthorization();
app.UseStaticFiles();
app.UseSpaStaticFiles();
app.MapControllers();
app.UseCors(myAllowSpecificOrigins);
//app.UseSpa(spa =>
//{
//    spa.Options.SourcePath = Path.Combine(Directory.GetCurrentDirectory(), "TotalControle-UI");

//    if(app.Environment.IsDevelopment())
//    {
//        spa.UseProxyToSpaDevelopmentServer($"http://localhost:4200");
//    }

//});
app.Run();
