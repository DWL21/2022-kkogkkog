import { SVGProps } from 'react';

const Close = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width='30'
      height='30'
      viewBox='0 0 30 30'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M5.71877 5.71877C6.07039 5.36727 6.54722 5.1698 7.0444 5.1698C7.54158 5.1698 8.01841 5.36727 8.37002 5.71877L15 12.3488L21.63 5.71877C21.9837 5.37723 22.4573 5.18824 22.9489 5.19251C23.4405 5.19678 23.9108 5.39397 24.2584 5.74161C24.6061 6.08925 24.8033 6.55953 24.8075 7.05115C24.8118 7.54277 24.6228 8.0164 24.2813 8.37002L17.6513 15L24.2813 21.63C24.6228 21.9837 24.8118 22.4573 24.8075 22.9489C24.8033 23.4405 24.6061 23.9108 24.2584 24.2584C23.9108 24.6061 23.4405 24.8033 22.9489 24.8075C22.4573 24.8118 21.9837 24.6228 21.63 24.2813L15 17.6513L8.37002 24.2813C8.0164 24.6228 7.54277 24.8118 7.05115 24.8075C6.55953 24.8033 6.08925 24.6061 5.74161 24.2584C5.39397 23.9108 5.19678 23.4405 5.19251 22.9489C5.18824 22.4573 5.37723 21.9837 5.71877 21.63L12.3488 15L5.71877 8.37002C5.36727 8.01841 5.1698 7.54158 5.1698 7.0444C5.1698 6.54722 5.36727 6.07039 5.71877 5.71877V5.71877Z'
        fill='#111111'
      />
    </svg>
  );
};

export default Close;
