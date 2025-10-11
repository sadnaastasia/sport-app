'use client';

import { useEffect, useState, createContext } from 'react';
import Timer from './Timer';
import { AiOutlineLoading } from 'react-icons/ai';

export const AppContext = createContext<any>(null);

export default function App() {
  const min = 2;
  const sec = 0;
  const [checkBoxStyle, setCheckBoxStyle] = useState<boolean>(false);
  const [[minutes, seconds], setTime] = useState(
    localStorage.getItem('term')
      ? [localStorage.getItem('minutes'), localStorage.getItem('seconds')]
      : [min > 9 ? min : '0' + min, sec > 9 ? sec : '0' + sec]
  );
  const [data, setData] = useState<Tariff[]>([]);
  const [checked, setChecked] = useState<boolean>(false);
  const [select, setSelected] = useState<boolean[]>([]);

  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch('https://t-core.fit-hub.pro/Test/GetTariffs');
        const data = await res.json();
        setData(data);
        const tariffSelected = [...data].fill(false);
        setSelected(tariffSelected);
      } catch (error) {
        throw new Error('Ошибка при получении данных');
      }
    }
    getData();
  }, []);

  function handleButtonClick() {
    if (!checked) {
      setCheckBoxStyle(true);
      document.getElementById('choice')!.scrollIntoView();
    }
  }

  function handleTariffChoice(index: number) {
    setSelected((prevSelected) => {
      const newSelected = [...prevSelected];
      newSelected.fill(false);
      newSelected[index] = !prevSelected[index];
      return newSelected;
    });
  }

  return (
    <AppContext.Provider value={{ min, sec, seconds, minutes, setTime }}>
      <div className="bg-[#232829]">
        <header className="fixed z-1 flex flex-col justify-center items-center top-0 left-0 w-screen h-[74px] min-[375px]:h-[85px] min-[1200px]:h-[103px] bg-[#1D5B43]">
          <span className="text-[14px] min-[375px]:text-[18px] md:text-[24px] text-white leading-[130%] font-[Montserrat] font-semibold">
            Успейте открыть пробную неделю
          </span>
          <Timer />
        </header>
        <main className="pb-[50px] px-[16px] md:px-[150px] 2xl:px-[352px]">
          <h1
            id="choice"
            className="pt-[94px] min-[375px]:pt-[105px] sm:pt-[153px] mb-[24px] min-[375px]:mb-[20px] min-[1200px]:mb-[110px] font-[Montserrat] text-[22px] min-[375px]:text-[24px] sm:text-4xl font-bold text-white leading-[110%]"
          >
            Выбери подходящий для себя{' '}
            <span className="text-[var(--yellow)]">тариф</span>
          </h1>
          <div className="flex flex-col min-[1200px]:flex-row justify-center items-center mb-[22px] min-[375px]:mb-[24px] md:mb-[66px]">
            <img
              className="h-[250px] w-[124px] sm:h-[500px] sm:w-[250px] lg:h-[762px] md:w-[380px] min-[1200px]:mr-[87px]"
              src="/man.svg"
              alt=""
            />
            <div className="w-full">
              {data.length > 0 ? (
                <div className="grid grid-rows-4 min-[1200px]:grid-cols-3 min-[1200px]:grid-rows-[190px_335px] gap-[8px] min-[1200px]:gap-[14px] mb-[20px]">
                  {data
                    .map((item: Tariff, index: number) => (
                      <button
                        className={`flex flex-col justify-between items-center relative hover:cursor-pointer border-2 rounded-4xl bg-[#313637] py-[20px] min-[1200px]:py-[26px] ${
                          item.is_best
                            ? 'border-[#FDB056] flex flex-row min-[1200px]:col-start-1 min-[1200px]:col-end-4 min-[1200px]:rows-5 px-[30px] min-[1200px]:px-[122px]'
                            : 'border-[#484D4E] flex flex-row justify-between min-[1200px]:pt-[70px] min-[1200px]:flex-col px-[20px] min-[375px]:px-[30px] min-[1200px]:px-[21px]'
                        } ${
                          select[index]
                            ? 'bg-[var(--yellow)] border-[var(--yellow)]'
                            : ''
                        }`}
                        key={item.id + item.period}
                        onClick={() => handleTariffChoice(index)}
                      >
                        <div
                          className={`w-full absolute flex justify-end min-[1200px]:justify-between gap-[14px] left-0 -top-[2px] pl-[50px] pr-[20px]`}
                        >
                          <div
                            className={`h-[39px] flex items-center bg-[#FD5656] rounded-b-xl py-[3px] px-[6px] text-[13px] min-[375px]:text-[16px] md:text-[22px] font-[Montserrat] font-medium text-white transition-opacity duration-500 ease-linear ${
                              Number(minutes) <= 0 && Number(seconds) <= 0
                                ? 'opacity-0'
                                : 'opacity-100'
                            } ${
                              item.is_best
                                ? ''
                                : 'mr-[28px] min-[375px]:mr-[30px] min-[1200px]:mr-0'
                            }`}
                          >
                            <span>
                              {Math.round(
                                ((item.price - item.full_price) /
                                  item.full_price) *
                                  100
                              )}
                              %
                            </span>
                          </div>
                          {item.is_best ? (
                            <div className="font-[Montserrat] min-[375px]:text-[16px] md:text-[22px] mt-[6px] min-[1200px]:mt-[10px] font-medium text-[var(--yellow)]">
                              хит!
                            </div>
                          ) : (
                            ''
                          )}
                        </div>
                        <div className="flex flex-col items-center justify-center">
                          <h3 className="text-[16px] min-[375px]:text-[18px] md:text-[26px] font-[Montserrat] font-medium text-white mt-0 mb-[16px]">
                            {item.period}
                          </h3>
                          <h1
                            className={`${
                              Number(minutes) <= 0 && Number(seconds) <= 0
                                ? 'hidden'
                                : 'block'
                            } text-[30px] min-[375px]:text-[34px] md:text-[50px] font-[Montserrat] font-semibold text-white transition-all duration-500 ease-linear mb-0`}
                          >
                            {item.price}₽
                          </h1>
                          <h4
                            className={` font-[Montserrat] font-normal transition-all duration-500 ease-linear ${
                              Number(minutes) <= 0 && Number(seconds) <= 0
                                ? 'no-underline text-white text-[16px] md:text-[24px]'
                                : 'line-through text-[#919191] text-[24px]'
                            } ${
                              item.is_best ? 'mb-0' : 'min-[1200px]:mb-[40px]'
                            }`}
                          >
                            {item.full_price}₽
                          </h4>
                        </div>
                        <p
                          className={`text-[14px] md:text-[16px] font-[Montserrat] font-normal text-white leading-[130%] text-left ${
                            item.is_best
                              ? 'ml-[40px]'
                              : 'ml-[30px] min-[375px]:ml-[50px] min-[1200px]:ml-0'
                          }`}
                        >
                          {item.text}
                        </p>
                      </button>
                    ))
                    .reverse()}
                </div>
              ) : (
                <AiOutlineLoading className="flex justify-center items-center animate-spin w-full h-60 mt-[30px] min-[1200px]:mt-0 mb-[60px]" />
              )}
              <div className="w-full lg:w-2/3 flex text-[12px] md:text-[16px] items-start font-[Montserrat] font-normal text-white bg-[#313637] py-[18px] px-[20px] rounded-3xl mb-[30px]">
                <div className="h-[34px] w-[34px] flex justify-center items-center bg-[url(/mark.svg)] bg-center bg-no-repeat mr-[8px]"></div>
                <p>
                  Следуя плану на 3 месяца и более, люди получают в 2 раза
                  лучший результат, чем за 1 месяц
                </p>
              </div>
              <div>
                <div className="h-[42px] min-[375px]:h-[28px] flex items-center mb-[16px]">
                  <input
                    className="w-[30px] h-[30px] md:w-[32px] md:h-[32px] checkbox-input"
                    type="checkbox"
                    id="policy"
                    checked={checked}
                    onChange={() => {
                      setChecked(!checked);
                      setCheckBoxStyle(checked);
                    }}
                  />
                  <label
                    htmlFor="policy"
                    className={`${
                      checkBoxStyle ? 'text-[#e61f1f]' : 'text-[#DCDCDC]'
                    } w-[600px] font-normal leading-[120%] font-[Montserrat] text-[12px] md:text-[16px] ml-[12px]`}
                  >
                    {' '}
                    Я согласен с{' '}
                    <a className="underline hover:cursor-pointer">
                      офертой рекуррентных платежей
                    </a>{' '}
                    и{' '}
                    <a className="underline hover:cursor-pointer">
                      Политикой конфиденциальности
                    </a>
                  </label>
                </div>
              </div>
              <button
                onClick={() => handleButtonClick()}
                className="w-full md:w-[352px] h-[66px] bg-[var(--yellow)] blinking-button rounded-[20px] font-[Montserrat] font-bold text-[18px] md:text-[20px] hover:cursor-pointer mb-[14px] "
              >
                Купить
              </button>
              <p className="w-full font-[Montserrat] font-normal text-[10px] md:text-[14px] text-[#9B9B9B] leading-[120%]">
                Нажимая кнопку «Купить», Пользователь соглашается на разовое
                списание денежных средств для получения пожизненного доступа к
                приложению. Пользователь соглашается, что данные
                кредитной/дебетовой карты будут сохранены для осуществления
                покупок дополнительных услуг сервиса в случае желания
                пользователя.
              </p>
            </div>
          </div>
          <div className="w-full p-[20px] border-1 border-[#484D4E] rounded-[30px]">
            <div className="h-[44px] md:h-[68px] w-full 2xl:w-2/3 flex justify-center items-center border-1 border-[var(--green)] rounded-[30px] font-[Montserrat] font-normal text-[16px] min-[375px]:text-[18px] md:text-[22px] xl:text-[28px] text-[var(--green)] mb-[10px] md:mb-[30px]">
              гарантия возврата 30 дней
            </div>
            <p className="font-[Montserrat] font-normal text-[13px] min-[375px]:text-[14px] md:text-[24px] text-[#DCDCDC] leading-[130%]">
              Мы уверены, что наш план сработает для тебя и ты увидишь видимые
              результаты уже через 4 недели! Мы даже готовы полностью вернуть
              твои деньги в течение 30 дней с момента покупки, если ты не
              получишь видимых результатов.
            </p>
          </div>
        </main>
      </div>
    </AppContext.Provider>
  );
}
