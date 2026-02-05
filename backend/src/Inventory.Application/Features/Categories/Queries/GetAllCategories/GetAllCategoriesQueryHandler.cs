using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Inventory.Application.DTOs;
using Inventory.Application.Wrappers;
using Inventory.Domain.Entities;
using Inventory.Domain.Interfaces;
using MediatR;

namespace Inventory.Application.Features.Categories.Queries.GetAllCategories
{
    public class GetAllCategoriesQueryHandler : IRequestHandler<GetAllCategoriesQuery, Response<IEnumerable<CategoryDto>>>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public GetAllCategoriesQueryHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<Response<IEnumerable<CategoryDto>>> Handle(GetAllCategoriesQuery request, CancellationToken cancellationToken)
        {
            var categoryList = await _unitOfWork.Repository<Category>().GetAllAsync();
            var categoryDtos = _mapper.Map<IEnumerable<CategoryDto>>(categoryList);
            return new Response<IEnumerable<CategoryDto>>(categoryDtos); // TODO: Add Pagination logic
        }
    }
}
