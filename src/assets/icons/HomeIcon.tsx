const HomeIcon = (props: {isSelected?: boolean}) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M22.9199 7.86946L13.6288 0.566869C13.1654 0.199726 12.5914 0 12.0003 0C11.4091 0 10.8351 0.199736 10.3718 0.566869L1.08067 7.86946C0.394982 8.42007 -0.00257085 9.25308 0.000661687 10.1324V21.1632C-0.0154089 21.8997 0.261811 22.6126 0.771474 23.1447C1.28094 23.6767 1.98118 23.9845 2.71775 24.0002H7.71447V15.4291C7.65267 14.8016 7.84571 14.1756 8.25033 13.6919C8.65497 13.2083 9.23714 12.9077 9.86582 12.8578H14.1514C14.7768 12.9119 15.3546 13.2144 15.7556 13.6977C16.1566 14.1807 16.3475 14.8043 16.2855 15.4291V24.0002H21.2822C22.0188 23.9846 22.7191 23.6767 23.2285 23.1447C23.7382 22.6126 24.0154 21.8997 23.9993 21.1632V10.1324C24.0026 9.25308 23.605 8.42007 22.9193 7.86946H22.9199Z" fill={props.isSelected ? "white" : "#B3B9C4"} />
</svg>
)

export default HomeIcon;