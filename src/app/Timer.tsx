import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { AppContext } from './App';

export default function Timer() {
  const [style, setStyle] = useState(
    localStorage.getItem('headerRed') ? true : false
  );
  const {
    minutes,
    seconds,
    setTime,
    min,
    sec,
  }: {
    minutes: number;
    seconds: number;
    setTime: Dispatch<SetStateAction<[string | number, string | number]>>;
    min: number;
    sec: number;
  } = useContext(AppContext);
  useEffect(() => {
    if (!localStorage.getItem('term')) {
      localStorage.setItem('term', `${Date.now() + min * 60000 + sec * 1000}`);
    }
    const timerId = setInterval(() => {
      ``;
      if (Number(minutes) <= 0 && Number(seconds) <= 0) {
        return;
      }
      if (Number(localStorage.getItem('term')) - Date.now() <= 0) {
        return;
      }
      if ((Number(localStorage.getItem('term')) - Date.now()) / 1000 < 31) {
        setStyle(true);
        localStorage.setItem('headerRed', 'true');
      }
      const now = Date.now();
      const diff = Number(localStorage.getItem('term')) - now;
      const min = parseInt((diff / 60000).toString());
      const sec = parseInt(((diff / 1000) % 60).toString());
      localStorage.setItem('minutes', `${min > 9 ? min : '0' + min}`);
      localStorage.setItem('seconds', `${sec > 9 ? sec : '0' + sec}`);
      setTime([min > 9 ? min : '0' + min, sec > 9 ? sec : '0' + sec]);
    }, 500);
    return () => clearInterval(timerId);
  }, []);
  return (
    <div className="flex items-center">
      <div className="h-[14px] w-[14px] flex justify-center items-center mr-[8px]">
        <svg
          width="13"
          height="12"
          viewBox="0 0 13 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${style ? 'animate-blink' : ''}`}
        >
          <path
            d="M5.83399 0.799865C6.06277 0.1816 6.93723 0.181601 7.16601 0.799866L8.27732 3.80312C8.34924 3.9975 8.5025 4.15076 8.69688 4.22268L11.7001 5.33399C12.3184 5.56277 12.3184 6.43723 11.7001 6.66601L8.69688 7.77732C8.5025 7.84924 8.34924 8.0025 8.27732 8.19688L7.16601 11.2001C6.93723 11.8184 6.06277 11.8184 5.83399 11.2001L4.72268 8.19688C4.65076 8.0025 4.4975 7.84924 4.30312 7.77732L1.29986 6.66601C0.6816 6.43723 0.681601 5.56277 1.29987 5.33399L4.30312 4.22268C4.4975 4.15076 4.65076 3.9975 4.72268 3.80312L5.83399 0.799865Z"
            fill={`${style ? '#ff4e4e' : '#FFBB00'}`}
          />
        </svg>
      </div>
      <div
        className={`${
          style ? 'animate-blink' : ''
        } flex text-[var(--yellow)] font-[Raleway] text-[28px] min-[375px]:text-[32px] md:text-[40px] font-bold leading-[110%]`}
      >
        {minutes}
        <span className="mx-[6px]">:</span>
        {seconds}
      </div>
      <div className="h-[14px] w-[14px] flex justify-center items-center ml-[8px]">
        <svg
          width="13"
          height="12"
          viewBox="0 0 13 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${style ? 'animate-blink' : ''}`}
        >
          <path
            d="M5.83399 0.799865C6.06277 0.1816 6.93723 0.181601 7.16601 0.799866L8.27732 3.80312C8.34924 3.9975 8.5025 4.15076 8.69688 4.22268L11.7001 5.33399C12.3184 5.56277 12.3184 6.43723 11.7001 6.66601L8.69688 7.77732C8.5025 7.84924 8.34924 8.0025 8.27732 8.19688L7.16601 11.2001C6.93723 11.8184 6.06277 11.8184 5.83399 11.2001L4.72268 8.19688C4.65076 8.0025 4.4975 7.84924 4.30312 7.77732L1.29986 6.66601C0.6816 6.43723 0.681601 5.56277 1.29987 5.33399L4.30312 4.22268C4.4975 4.15076 4.65076 3.9975 4.72268 3.80312L5.83399 0.799865Z"
            fill={`${style ? '#ff4e4e' : '#FFBB00'}`}
          />
        </svg>
      </div>
    </div>
  );
}
