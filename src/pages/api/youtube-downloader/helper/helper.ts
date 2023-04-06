export function fileSizeHumanReadable(bytes: number) {
  const kilobyte = 1024,
    megabyte = kilobyte * 1024,
    gigabyte = megabyte * 1024,
    terabyte = gigabyte * 1024;

  // converting
  if (bytes >= 0 && bytes < kilobyte) {
    return `${bytes}  B`;
  } else if (bytes >= kilobyte && bytes < megabyte) {
    return `${(bytes / kilobyte).toFixed(2)}  KB`;
  } else if (bytes >= megabyte && bytes < gigabyte) {
    return `${(bytes / megabyte).toFixed(2)}  MB`;
  } else if (bytes >= gigabyte && bytes < terabyte) {
    return `${(bytes / gigabyte).toFixed(2)} GB`;
  } else if (bytes >= gigabyte) {
    return `${(bytes / terabyte).toFixed(2)} TB`;
  } else {
    return `${bytes}  B`;
  }
}

function formatViews(num: number) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  }
  return num;
}
