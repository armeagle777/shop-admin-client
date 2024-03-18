export const generateRandomColor = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  return `rgb(${r},${g},${b})`;
};

export const formatCountriesData = (countries) => {
  if (!countries) return;

  const result = countries.reduce((acc, val) => {
    const {
      id,
      attributes: { name, marzs },
    } = val;

    const mzs = marzs.data.reduce((acc, el) => {
      const {
        id,
        attributes: { name, communities },
      } = el;

      const coms = communities?.data.reduce((acc, el) => {
        const {
          id,
          attributes: { name, settlements },
        } = el;

        const sets = settlements?.data.reduce((acc, el) => {
          const {
            id,
            attributes: { name },
          } = el;
          const setsObj = { value: id, label: name };
          acc.push(setsObj);
          return acc;
        }, []);

        const settlementObj = {
          value: id,
          label: name,
          children: sets,
        };
        acc.push(settlementObj);
        return acc;
      }, []);

      const marzesObj = { value: id, label: name, children: coms };
      acc.push(marzesObj);
      return acc;
    }, []);

    const countriesObj = { value: id, label: name, children: mzs };
    acc.push(countriesObj);
    return acc;
  }, []);

  return result;
};

export const formatImageUrl = (url) => {
  return url.startsWith('https://')
    ? url
    : `${import.meta.env.VITE_IMAGE_SERVER_URL}${url}`;
};
