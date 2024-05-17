import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEmails } from '../store/emailsSlice';

const useEmails = () => {
  const dispatch = useDispatch();
  const { emails, status, error } = useSelector((state) => state.emails);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchEmails());
    }
  }, [status, dispatch]);

  return { emails, status, error };
};

export default useEmails;
