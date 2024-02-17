export const getKey = async ({ ctx, inbound, userServer }: any) => {
  const inboundsSettings = JSON.parse(inbound?.obj?.settings);
  const inboundsStreamSettings = JSON.parse(inbound?.obj?.streamSettings);
  const userId = inboundsSettings?.clients?.find(
    (item: any) => item.email == ctx.from.id
  )?.id;
  const userName = inboundsSettings?.clients?.find(
    (item: any) => item.email == ctx.from.id
  )?.email;
  const flow = inboundsSettings?.clients?.find(
    (item: any) => item.email == ctx.from.id
  )?.flow;
  const remark = inbound?.obj?.remark;
  const pbKey = inboundsStreamSettings?.realitySettings?.settings?.publicKey;
  const fp = inboundsStreamSettings?.realitySettings?.settings?.fingerprint;
  const sid = inboundsStreamSettings?.realitySettings?.shortIds?.[0];
  const security = inboundsStreamSettings?.security;
  const network = inboundsStreamSettings?.network;
  const sni = inboundsStreamSettings?.realitySettings?.serverNames?.[0];
  const serverUrl = userServer?.split('/')?.[2]?.split(':')?.[0];
  console.log(serverUrl)
  if (
    userId &&
    userName &&
    flow &&
    remark &&
    pbKey &&
    fp &&
    sid &&
    security &&
    network &&
    serverUrl
  ) {
    const vpnKey = `vless://${userId}@${serverUrl}:433?type=${network}&security=${security}&pbk=${pbKey}&fp=${fp}&sni=${sni}&sid=${sid}&spx=%2F&flow=${flow}#${remark}-${userName}`;
    return vpnKey;
  }
};
