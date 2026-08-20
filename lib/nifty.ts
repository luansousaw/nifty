const MODEL_1 = "https://img1.niftyimages.com/-uvh/hbfp/_sol";
const MODEL_2 = "https://img1.niftyimages.com/-uvh/pbfp/wsol";

function withTags(base: string, carro: string, valorCarro: string) {
  const params = new URLSearchParams({ CARRO: carro, VALORCARRO: valorCarro });
  return `${base}?${params.toString()}`;
}

export function buildNiftyUrls(carro: string, valorCarro: string) {
  return {
    model1Url: withTags(MODEL_1, carro, valorCarro),
    model2Url: withTags(MODEL_2, carro, valorCarro),
  };
}
