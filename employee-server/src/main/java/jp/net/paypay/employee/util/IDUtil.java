package jp.net.paypay.employee.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


public class IDUtil {
    private static final Logger LOGGER = LoggerFactory.getLogger(IDUtil.class);
    /**
     * locker
     */
    private static final Object ID_LOCK = new Object();
    /**
     * current mills
     */
    private static long CURRENT_SECOND = System.currentTimeMillis() / 1000L;
    private static int ID = 0;

    public static void main(String[] args) {
        LOGGER.info(String.valueOf(Integer.MAX_VALUE / (365 * 24 * 60 * 60)));
        LOGGER.info(Integer.toBinaryString((int) (System.currentTimeMillis() / 1000)));
    }

    /**
     * get a uid
     *
     * @return long
     */
    public static long getId() {
        int tempId;
        long tempCurSec = System.currentTimeMillis() / 1000L;
        synchronized (ID_LOCK) {
            ID += 1;
            tempId = ID;
            if (ID > 65000) {
                ID = 0;
                CURRENT_SECOND += 1L;
            }
            if (tempCurSec > CURRENT_SECOND) {
                CURRENT_SECOND = tempCurSec;
            } else {
                tempCurSec = CURRENT_SECOND;
            }
        }
        return ((tempCurSec) << 16 | tempId & 0xFFFF);
    }

}
