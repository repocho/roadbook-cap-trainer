import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faLocationPin } from '@fortawesome/free-solid-svg-icons';

interface HistoryCapListProps {
    historyCap: Array<{
        current: number;
        next: number;
        isLeft: boolean;
        correct: boolean;
    }>;
}
function HistoryCapList({ historyCap }: HistoryCapListProps) {
    return (
        <div>
            {historyCap.map((el, index) => {
                let color = el.correct ? 'green' : 'red';
                return (
                    <div key={index}>
                        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                            <div>{el.current}</div>
                            <div>{el.next}</div>
                            {el.isLeft ? (
                                <FontAwesomeIcon icon={faArrowLeft} style={{ color: color }} />
                            ) : (
                                <FontAwesomeIcon icon={faArrowRight} style={{ color: color }} />
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default HistoryCapList;
