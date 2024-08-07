import Image from "next/image";
import GenericModal from "./GenericModal";
import { Connector, useConnect } from "@starknet-react/core";
import Close from "svg/Close";

const loader = ({ src }: { src: string }) => {
  return src;
};

const Wallet = ({
  name,
  alt,
  src,
  connector,
}: {
  name: string;
  alt: string;
  src: string;
  connector: Connector;
}) => {
  const { connect } = useConnect();
  const isSvg = src?.startsWith("<svg");

  function handleConnectWallet(e: React.MouseEvent<HTMLButtonElement>): void {
    connect({ connector });
    const popover = document.getElementById("connect-modal");
    popover.hidePopover();
    localStorage.setItem("lastUsedConnector", connector.name);
  }

  return (
    <button
      className="flex gap-4 items-center text-start p-[.2rem] hover:bg-outline-grey hover:rounded-[10px] transition-all cursor-pointer"
      onClick={(e) => handleConnectWallet(e)}
    >
      <div className="h-[2.2rem] w-[2.2rem] rounded-[5px]">
        {isSvg ? (
          <div
            className="h-full w-full object-cover rounded-[5px]"
            dangerouslySetInnerHTML={{
              __html: src ?? "",
            }}
          />
        ) : (
          <Image
            alt={alt}
            loader={loader}
            src={src}
            width={70}
            height={70}
            className="h-full w-full object-cover rounded-[5px]"
          />
        )}
      </div>
      <p className="flex-1">{name}</p>
    </button>
  );
};

const ConnectModal = () => {
  const { connectors } = useConnect();
  return (
    <GenericModal
      popoverId="connect-modal"
      style="text-white border-outline-grey mx-auto flex w-[90vw] flex-col rounded-[25px] border-[1px] border-solid bg-[#1c1b1f] md:h-[30rem] md:w-[45rem]"
    >
      <div className="flex p-4 w-full lg:p-0 lg:grid lg:grid-cols-5">
        <div className="basis-5/6 lg:col-span-2  lg:border-r-[1px] lg:border-solid lg:border-outline-grey lg:py-4 lg:pl-8">
          <h2 className="text-center my-4 lg:text-start font-bold text-white text-[1.125em]">
            Connect a Wallet
          </h2>
        </div>
        <div className="ml-auto lg:col-span-3 lg:py-4 lg:pr-8">
          <button
            popovertarget="connect-modal"
            popovertargetaction="hide"
            className="bg-outline-grey grid h-8 w-8 place-content-center rounded-full"
          >
            <Close />
          </button>
        </div>
      </div>
      <div className="flex flex-col flex-1 justify-between lg:grid lg:grid-cols-5 ">
        <div className="px-8  lg:h-full lg:col-span-2  lg:border-r-[1px] lg:border-solid lg:border-outline-grey">
          <h4 className="mb-[1rem] text-text-grey font-semibold">Popular</h4>

          <div className="flex flex-col gap-4 py-8">
            {connectors.map((connector, index) => (
              <Wallet
                key={connector.id || index}
                src={connector.icon.light!}
                name={connector.name}
                connector={connector}
                alt="alt"
              />
            ))}
          </div>
        </div>
        <div className="p-4 border-t-[.5px] border-solid  border-red h-fit lg:h-full lg:border-none lg:col-span-3 lg:px-8 lg:py-0 lg:flex lg:flex-col">
          <h2 className="lg:text-center lg:mb-[3rem] lg:text-[1.125em]  font-bold">
            What is a wallet?
          </h2>
          <article className="hidden lg:flex  flex-col gap-8 place-content-center text-[0.875em] justify-self-center self-center ">
            <div className="grid grid-cols-10 items-center  gap-4">
              <div className="col-span-2 border-solid border-[2px] border-white rounded-[10px] h-[3rem] w-[3rem]">
                <Image
                  alt="text"
                  loader={loader}
                  src={
                    "https://media.istockphoto.com/id/1084096262/vector/concept-of-mobile-payments-wallet-connected-with-mobile-phone.jpg?s=612x612&w=0&k=20&c=noILf6rTUyxN41JnmeFhUmqQWiCWoXlg0zCLtcrabD4="
                  }
                  width={100}
                  height={100}
                  className="h-full w-full object-cover rounded-[10px]"
                />
              </div>
              <div className="col-span-8 flex flex-col gap-2 ">
                <h4 className="text-[1.14em] font-bold">
                  A home for your digital assets
                </h4>
                <p className="text-text-grey">
                  Wallets are used to send, receive, store, and display digital
                  assets like Ethereum and NFTs.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-10 items-center  gap-4">
              <div className="col-span-2 border-solid border-[2px] border-white rounded-[10px] h-[3rem] w-[3rem]">
                <Image
                  alt="text"
                  loader={loader}
                  src={
                    "https://media.licdn.com/dms/image/D4E12AQFyWdLwXcJu3Q/article-cover_image-shrink_720_1280/0/1687854784940?e=2147483647&v=beta&t=nNDH-9XEcVYcb1PAc3S78ndQze0126KPOSZmnmMERNg"
                  }
                  width={100}
                  height={100}
                  className="h-full w-full object-cover rounded-[10px]"
                />
              </div>
              <div className="col-span-8 flex flex-col gap-2 ">
                <h4 className="text-[1.14em] font-bold">
                  A new way to sign-in
                </h4>
                <p className="text-text-grey pb-2">
                  Instead of creating new accounts and passwords on every
                  website, just connect your wallet.
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </GenericModal>
  );
};

export default ConnectModal;
