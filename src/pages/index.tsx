import { AppNavbar } from '@/widgets/app-navbar';
import { Content } from '@/layout/content';
import { Filter } from '@/features/filter';
import { CarList } from '@/widgets/car-list';
import { useCarsQuery } from '@/entitites/car';
import { PaginationList } from '@/shared';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Home() {
  const router = useRouter();
  const { data, isSuccess } = useCarsQuery({ populate: 'images', ...router.query, ['pagination[pageSize]']: 6 });
  const [pageInfo, setPages] = useState<{
    page: null | number;
    totalPages: null | number;
  }>({ page: null, totalPages: null });

  useEffect(() => {
    if (data && isSuccess) {
      setPages({
        page: data.pagination.page,
        totalPages: data.pagination.pageCount,
      });
    }
  }, [data, isSuccess]);

  return (
    <div>
      <AppNavbar />
      <Content className='flex jutify-between'>
        <div className='w-1/5'>
          <Filter
            onSubmit={(values) => {
              const { pathname } = router;
              let args = [];
              if (values.name !== '') {
                args.push(`filters[name][$contains]=${values.name}`);
              }
              if (values.fromPrice) {
                args.push(`filters[price][$gte]=${values.fromPrice}`);
              }
              if (values.toPrice) {
                args.push(`filters[price][$lte]=${values.toPrice}`);
              }
              if (values.powerReverse) {
                args.push(`filters[powerReverse][$eq]=${values.powerReverse}`);
              }
              if (values.brands.length > 0) {
                args = [...args, ...values.brands.map((brand, index) => `filters[brand][$in][${index}]=${brand}`)];
              }
              if (values.colors.length > 0) {
                args = [...args, ...values.colors.map((color, index) => `filters[color][$in][${index}]=${color}`)];
              }
              if (values.engines.length > 0) {
                args = [...args, ...values.engines.map((engine, index) => `filters[engine][$in][${index}]=${engine}`)];
              }
              if (values.transmissions.length > 0) {
                args = [...args, ...values.transmissions.map((transmission, index) => `filters[transmission][$in][${index}]=${transmission}`)];
              }
              router.push(`${pathname}?${args.join('&')}`);
            }}
          />
        </div>
        <div className='w-4/5'>
          <CarList cardList={data && data.list ? data.list : []} />
          {pageInfo.page && pageInfo.totalPages && data?.list && data?.list.length > 0 && (
            <div className='mt-5'>
              <PaginationList
                totalPages={pageInfo.totalPages}
                currentPage={pageInfo.page}
                onPageChange={(pageNumber) => {
                  const { pathname, query } = router;

                  const params = Object.keys(query)
                    .filter((key) => key !== 'pagination[page]')
                    .map((key) => `${key}=${query[key]}`)
                    .join('&');

                  router.push(`${pathname}?pagination[page]=${pageNumber}${params !== '' ? `&${params}` : ''}`);
                }}
              />
            </div>
          )}
        </div>
      </Content>
    </div>
  );
}
