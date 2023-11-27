export const post = async (url: string, data: any) => {
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (error) {
    console.log('ERROR', error);
  }
};
