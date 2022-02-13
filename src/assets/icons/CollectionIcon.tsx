const CollectionIcon = (props: {isSelected?: boolean}) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18.2852 22.4001H6.11727C4.91882 22.4016 3.76893 21.9261 2.92146 21.0787C2.074 20.2312 1.59858 19.0813 1.60006 17.8829V5.71495C1.60006 5.42924 1.44753 5.1651 1.19995 5.02206C0.952562 4.8792 0.647485 4.8792 0.399918 5.02206C0.152526 5.1651 0 5.42923 0 5.71495V17.8829C0.00427822 19.5039 0.650086 21.0575 1.79631 22.2038C2.94267 23.35 4.49622 23.9959 6.11729 24.0002H18.2852C18.5709 24.0002 18.835 23.8476 18.9781 23.6002C19.1209 23.3527 19.1209 23.0476 18.9781 22.8002C18.835 22.5526 18.5709 22.4001 18.2852 22.4001L18.2852 22.4001Z" fill={props.isSelected ? "white" : "#B3B9C4"}/>
<path d="M20.776 0.000366211H6.62674C5.77242 0.00241232 4.95357 0.342809 4.34944 0.946971C3.7453 1.55113 3.40488 2.36995 3.40283 3.22427V17.3736C3.40488 18.2279 3.74527 19.0467 4.34944 19.6509C4.9536 20.255 5.77242 20.5954 6.62674 20.5975H20.776C21.6304 20.5954 22.4492 20.255 23.0533 19.6509C23.6575 19.0467 23.9979 18.2279 23.9999 17.3736V3.22427C23.9979 2.36995 23.6575 1.5511 23.0533 0.946971C22.4492 0.342837 21.6304 0.0024138 20.776 0.000366211ZM20.32 14.2697H7.08301C6.84659 14.2695 6.61836 14.1821 6.44202 14.0243C6.26568 13.8666 6.1537 13.6493 6.12729 13.4142C6.10106 13.1791 6.16207 12.9425 6.29916 12.7496L7.20039 11.4671L8.4057 9.77644C8.58557 9.52179 8.87798 9.37039 9.18974 9.37039C9.50149 9.37039 9.79373 9.5218 9.97378 9.77644L11.1843 11.4671L11.5283 11.9524L12.9601 9.94177L15.2508 6.72306H15.251C15.4322 6.46953 15.7246 6.31905 16.0363 6.31905C16.3479 6.31905 16.6403 6.46953 16.8215 6.72306L19.1121 9.94177L21.1067 12.7418V12.7416C21.247 12.9349 21.3104 13.1731 21.2847 13.4105C21.2591 13.6478 21.1462 13.8671 20.968 14.0258C20.7898 14.1847 20.5587 14.2715 20.3201 14.2697L20.32 14.2697Z" fill={props.isSelected ? "white" : "#B3B9C4"}/>
</svg>
)

export default CollectionIcon;