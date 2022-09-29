import { useFetchCouponListByStatus } from '@/@hooks/@queries/coupon';
import { Styled } from '@/@pages/coupon-list';
import { Coupon, COUPON_LIST_TYPE } from '@/types/coupon/client';

import BigCouponItem from '../CouponItem/big';
import VerticalCouponList from '../CouponList/vertical';

interface FinishedCouponListSectionProps {
  couponListType: COUPON_LIST_TYPE;
  onClickCouponItem: (coupon: Coupon) => void;
}

const FinishedCouponListSection = (props: FinishedCouponListSectionProps) => {
  const { couponListType, onClickCouponItem } = props;

  const { couponListByStatus: finishedCouponList } = useFetchCouponListByStatus({
    couponListType,
    body: { type: 'FINISHED' },
  });

  return (
    <Styled.VerticalListContainer>
      <VerticalCouponList
        couponList={finishedCouponList}
        CouponItem={BigCouponItem}
        onClickCouponItem={onClickCouponItem}
      />
    </Styled.VerticalListContainer>
  );
};

export default FinishedCouponListSection;
