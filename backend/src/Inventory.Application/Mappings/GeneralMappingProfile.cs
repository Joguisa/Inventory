using AutoMapper;
using Inventory.Application.DTOs;
using Inventory.Domain.Entities;
using Inventory.Application.Features.Categories.Commands.CreateCategory;
using Inventory.Application.Features.Categories.Commands.UpdateCategory;
using Inventory.Application.Features.Categories.Commands.DeleteCategory;
using Inventory.Application.Features.Suppliers.Commands.CreateSupplier;
using Inventory.Application.Features.Products.Commands.CreateProduct;
using Inventory.Application.Features.Products.Commands.UpdateProduct;

namespace Inventory.Application.Mappings
{
    public class GeneralMappingProfile : Profile
    {
        public GeneralMappingProfile()
        {
            CreateMap<Category, CategoryDto>().ReverseMap();
            CreateMap<Supplier, SupplierDto>().ReverseMap();
            
            CreateMap<CreateCategoryCommand, Category>();
            CreateMap<UpdateCategoryCommand, Category>();

            CreateMap<CreateSupplierCommand, Supplier>();
            CreateMap<CreateProductCommand, Product>();

            CreateMap<UpdateProductCommand, Product>();
            CreateMap<CreateProductInventoryDetailCommand, ProductInventoryDetail>();
            CreateMap<UpdateProductInventoryDetailCommand, ProductInventoryDetail>();
            
            CreateMap<ProductInventoryDetail, ProductInventoryDetailDto>()
                .ForMember(dest => dest.SupplierName, opt => opt.MapFrom(src => src.Supplier != null ? src.Supplier.Name : null))
                .ReverseMap();

            CreateMap<Product, ProductDto>()
                .ForMember(dest => dest.CategoryName, opt => opt.MapFrom(src => src.Category != null ? src.Category.Name : null))
                .ReverseMap();
        }
    }
}
